import { useState } from "react";
import { User } from "@/store/userStore.ts";

const PeopleSelectList = () => {
  const [people, setPeople] = useState<User[]>([]);

  return (
    <div className="border w-full">
      {people.map((p) => {
        return <div></div>;
      })}
    </div>
  );
};

export default PeopleSelectList;
