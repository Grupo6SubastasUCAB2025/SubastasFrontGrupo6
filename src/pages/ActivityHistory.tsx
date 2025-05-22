import { useEffect, useState } from "react";

interface Activity {
  id: string;
  timestamp: string;
  description: string;
}

export default function ActivityHistory() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("http://localhost:5085/api/user/activity");
        const data = await res.json();
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activity history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Historial de Actividad</h2>
      {loading ? (
        <p>Cargando historial...</p>
      ) : activities.length > 0 ? (
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
              <p className="text-gray-700">{activity.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay actividad registrada.</p>
      )}
    </div>
  );
}
