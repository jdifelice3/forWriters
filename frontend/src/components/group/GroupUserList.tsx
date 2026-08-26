import { Avatar, Card, CardContent, Chip, Typography } from "@mui/material";
import { GroupUser } from "../../types/domain-types";

interface Props {
  groupUsers: GroupUser[];
}

function memberName(member: GroupUser) {
  const profile = member.user.userProfile;
  if (!profile?.firstName || !profile?.lastName) return "Name not provided";
  return `${profile.firstName} ${profile.lastName}`;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const GroupUserList: React.FC<Props> = ({ groupUsers }) => (
  <div className="group-member-grid">
    {groupUsers.map((member) => {
      const name = memberName(member);
      return (
        <Card className="group-member-card" key={member.id}>
          <CardContent>
            <Avatar alt={name} src={member.user.userProfile?.avatarUrl ?? undefined}>
              {initials(name)}
            </Avatar>
            <span>
              <Typography component="strong">{name}</Typography>
              <Typography component="small">{member.user.email}</Typography>
            </span>
            <Chip
              size="small"
              color={member.role === "ADMIN" || member.role === "OWNER" ? "success" : "default"}
              label={member.role.toLowerCase()}
            />
          </CardContent>
        </Card>
      );
    })}
  </div>
);

export default GroupUserList;
