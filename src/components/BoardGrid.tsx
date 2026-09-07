import { initials } from "@/lib/format";
import type { BoardMember } from "@/lib/wix";

const FALLBACK: BoardMember[] = [
  { id: "rz", name: "Dr. Rafiullah Zahibzada", designation: "Chairperson", photoUrl: null, sortKey: "0" },
  { id: "ik", name: "Mr. Imran Khan", designation: "Secretary", photoUrl: null, sortKey: "1" },
  { id: "ar", name: "Dr. Ali Rehman", designation: "Treasurer", photoUrl: null, sortKey: "2" },
  { id: "nm", name: "Mr. Nadim Mulani", designation: "Youth Services", photoUrl: null, sortKey: "3" },
  { id: "ak", name: "Mr. Arif Khan", designation: "Maintenance", photoUrl: null, sortKey: "4" },
  { id: "db", name: "David (Dawood) Bathurst", designation: "Funeral Service", photoUrl: null, sortKey: "5" },
  { id: "kh", name: "Dr. Khairul Hashan", designation: "Social Services", photoUrl: null, sortKey: "6" },
  { id: "ya", name: "Mr. Yasir Arafath", designation: "Education Services", photoUrl: null, sortKey: "7" },
  { id: "fs", name: "Faisal Syed", designation: "Sports Services", photoUrl: null, sortKey: "8" },
];

export default function BoardGrid({ members }: { members: BoardMember[] }) {
  const list = members.length > 0 ? members : FALLBACK;
  return (
    <div className="row g-4">
      {list.map((m) => (
        <div className="col-md-6 col-xl-3" key={m.id}>
          <div className="team-block-two">
            <div className="inner-box">
              <figure className="image">
                {m.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photoUrl} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                ) : (
                  <div className="avatar-circle">{initials(m.name)}</div>
                )}
              </figure>
              <div className="content-box">
                <div className="title-box">
                  <div className="h5 title">{m.name}</div>
                  <p className="sub-title">{m.designation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
