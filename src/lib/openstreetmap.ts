interface Coordinates {
  lat: number;
  lon: number;
}

interface OSMHospital {
  id: number;
  lat: number;
  lon: number;
  tags: {
    name?: string;
    amenity?: string;
    "addr:street"?: string;
    "addr:city"?: string;
    "addr:postcode"?: string;
    healthcare?: string;
  };
}

// Convert pincode to coordinates using Nominatim
export async function getPincodeCoordinates(pincode: string): Promise<Coordinates> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=india&format=json`,
    {
      headers: {
        "User-Agent": "ClinIQ/1.0",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to geocode pincode");
  }

  const data = await response.json();
  if (!data.length) {
    throw new Error("Pincode not found");
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
}

// Get hospitals near coordinates using Overpass API
export async function getHospitalsNearby(coords: Coordinates, radius: number = 5000): Promise<OSMHospital[]> {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
      way["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
      relation["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
      node["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
      way["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
      relation["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
    );
    out body;
    >;
    out skel qt;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hospitals");
  }

  const data = await response.json();
  return data.elements.filter((el: any) => el.tags?.name) as OSMHospital[];
}

// Calculate distance between two coordinates in kilometers
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Format OSM hospital data into our Hospital interface
export function formatHospitalData(osmHospital: OSMHospital, userLat: number, userLon: number) {
  const distance = calculateDistance(userLat, userLon, osmHospital.lat, osmHospital.lon);
  const address = [
    osmHospital.tags["addr:street"],
    osmHospital.tags["addr:city"],
    osmHospital.tags["addr:postcode"],
  ]
    .filter(Boolean)
    .join(", ");

  return {
    id: osmHospital.id.toString(),
    name: osmHospital.tags.name || "Unnamed Hospital",
    distance: parseFloat(distance.toFixed(1)),
    address: address || "Address not available",
    coordinates: {
      lat: osmHospital.lat,
      lon: osmHospital.lon,
    },
  };
}