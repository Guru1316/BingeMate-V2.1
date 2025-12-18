import { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [data, setData] = useState({
    counts: { users: 0, series: 0, reviews: 0, watchlist: 0 },
    recentUsers: [],
    recentReviews: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        if (res.data.status === "Success") {
          setData(res.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Admin stats error:", err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="admin-dashboard"><h1>Loading...</h1></div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <div className="admin-card">👤 Users<br /><span>{data.counts.users}</span></div>
        <div className="admin-card">🎬 Series<br /><span>{data.counts.series}</span></div>
        <div className="admin-card">📝 Reviews<br /><span>{data.counts.reviews}</span></div>
        <div className="admin-card">⭐ Watchlist<br /><span>{data.counts.watchlist}</span></div>
      </div>

      <div className="admin-content-split">
        <section className="admin-section">
          <h2 className="section-subtitle">Recent Signups</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.recentUsers.map(user => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2 className="section-subtitle">Latest Reviews</h2>
          <div className="admin-feed">
            {data.recentReviews.map((entry) => (
              <div key={entry._id} className="admin-feed-item">
                <div className="feed-info">
                  <strong>{entry.series?.name || "Unknown Series"}</strong>
                  <span className="feed-user"> by {entry.user?.email?.split("@")[0] || "Anonymous"}</span>
                </div>
                <p className="feed-text">"{entry.review?.substring(0, 60)}..."</p>
                <span className="feed-date">{new Date(entry.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;