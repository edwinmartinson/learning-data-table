import type { User } from "@/type";
import { faker } from "@faker-js/faker";

export function createRandomUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    userId: faker.string.nanoid(),
    firstName,
    lastName,
    dob: faker.date
      .birthdate({ min: 18, max: 40, mode: "age" })
      .toLocaleDateString(),
    email: faker.internet.email({ firstName, lastName }),
    phoneNo: faker.phone.number({ style: "international" }),
    countryCode: faker.location.countryCode({ variant: "alpha-2" }),
    status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE"]),
  };
}

export function createRandomUsers(count: number): User[] {
  return Array.from({ length: count }, createRandomUser);
}
