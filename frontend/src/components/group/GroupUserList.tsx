import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { GroupUser } from "../../types/domain-types";
import { groupMemberName } from "../../utils/groupMember";

interface Props {
  groupUsers: GroupUser[];
  canRemoveMember?: (member: GroupUser) => boolean;
  onRemoveMember?: (member: GroupUser) => void;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const GroupUserList: React.FC<Props> = ({
  groupUsers,
  canRemoveMember,
  onRemoveMember,
}) => (
  <div className="group-member-grid">
    {groupUsers.map((member) => {
      const name = groupMemberName(member);
      const isRemovable = Boolean(
        onRemoveMember && canRemoveMember?.(member)
      );
      const content = (
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
      );

      return (
        <Card
          className={`group-member-card${isRemovable ? " removable" : ""}`}
          key={member.id}
        >
          {isRemovable ? (
            <CardActionArea
              aria-label={`Remove ${name} from group`}
              onClick={() => onRemoveMember?.(member)}
            >
              {content}
            </CardActionArea>
          ) : (
            content
          )}
        </Card>
      );
    })}
  </div>
);

export default GroupUserList;
