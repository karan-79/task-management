import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Person } from "@/features/Project/types.ts";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { searchUser } from "@/service/userService";
import { debounce, isEmpty } from "lodash";
import { Button } from "@/components/Button";
import Typography from "@/components/Typography";
import { Search } from "lucide-react";
import { Input } from "@/components/Input";
import { ScrollArea, ScrollBar } from "@/components/ScrollArea";
import { useElementWidth } from "@/hooks/useElementWidth";
import PersonSelectableLabel from "@/features/components/PersonSelectableLabel";

type Props = {
  onSelect: (person: Person) => void;
};

const PersonSelect: FC<Props> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const buttonRef = useRef(null);
  const popoverWidth = useElementWidth(buttonRef);

  const handleSearch = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      if (isEmpty(e.target.value.trim())) return;
      searchUser(e.target.value.trim()).then((users) =>
        setPersons(users satisfies Person[]),
      );
    }, 500),
    [],
  );

  return (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          ref={buttonRef}
          className="w-full justify-start"
        >
          "Search person..."
          <Search className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: popoverWidth + "px" }}>
        <Input placeholder="Seacrh" onChange={handleSearch} className="mb-2" />
        <ScrollArea>
          <div className="max-h-60">
            {isEmpty(persons) && (
              <div className="p-2 flex justify-center">
                <Typography variant="h6">Nothing found</Typography>
              </div>
            )}
            {persons.map((person) => {
              return (
                <PersonSelectableLabel
                  key={person.id}
                  person={person}
                  onSelect={() => onSelect(person)}
                />
              );
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default PersonSelect;
