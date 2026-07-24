export type Booking = {
  id: number;
  resource: string;
  title: string;
  start: number;
  duration: number;
  owner: string;
  color: string;
  day: number;
};

export const resources = [
  { name: "Atlas Room", meta: "North Wing · 8 people", color: "#16805d" },
  { name: "Horizon Lab", meta: "Innovation Hub · 20 people", color: "#4263eb" },
  { name: "Focus Pod 04", meta: "Level 2 · 2 people", color: "#8b5cc7" },
  { name: "Media Kit A", meta: "Equipment Store", color: "#db7b28" },
];

export const seedBookings: Booking[] = [
  { id: 1, resource: "Atlas Room", title: "Product stand-up", start: 9, duration: 1, owner: "Maya + 5", color: "#dff5ec", day: 0 },
  { id: 2, resource: "Horizon Lab", title: "Robotics workshop", start: 11, duration: 2, owner: "Omar + 14", color: "#e4eaff", day: 0 },
  { id: 3, resource: "Focus Pod 04", title: "Research interview", start: 14, duration: 1.5, owner: "You + 1", color: "#f0e8ff", day: 0 },
  { id: 4, resource: "Atlas Room", title: "Design critique", start: 10, duration: 1.5, owner: "Lina + 6", color: "#dff5ec", day: 1 },
  { id: 5, resource: "Media Kit A", title: "Campaign shoot", start: 13, duration: 2, owner: "Samir + 3", color: "#fff0df", day: 2 },
  { id: 6, resource: "Horizon Lab", title: "Open lab hours", start: 9.5, duration: 3, owner: "Aisha", color: "#e4eaff", day: 3 },
  { id: 7, resource: "Atlas Room", title: "Partner meeting", start: 15, duration: 1, owner: "Ibrahim + 4", color: "#dff5ec", day: 4 },
];

export const createMockBooking = (resource: string, title: string): Booking => {
  const info = resources.find((item) => item.name === resource);
  return { id: Date.now(), resource, title, start: 16, duration: 1, owner: "You", color: `${info?.color ?? "#16805d"}20`, day: 4 };
};
