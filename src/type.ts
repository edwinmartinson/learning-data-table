export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phoneNo: string;
  counrtyCode: string;
  status: "ACTIVE" | "INACTIVE";
};
