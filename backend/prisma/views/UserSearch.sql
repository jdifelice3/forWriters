drop table "UserSearch";
create view "UserSearch" as SELECT id, "firstName" || ' ' || "lastName" AS "fullName", bio from "UserProfile";