import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/Button";
import Typography from "@/components/Typography";
import { Input } from "@/components/Input";
import { debounce, isEmpty } from "lodash";
import { searchUser } from "@/service/userService.ts";
import { User } from "@/store/userStore.ts";
import { Avatar, AvatarFallback } from "@/components/Avatar/Avatar.tsx";
import { getInitials } from "@/features/Project/Content/TasksTable/utils.ts";
import { ScrollArea, ScrollBar } from "@/components/ScrollArea";
import { Person } from "@/features/Project/types.ts";
import { Nullable } from "@/types/generalTypes.ts";
import { useElementWidth } from "@/hooks/useElementWidth.ts";
import PersonAvatarLabel from "@/features/components/PersonAvatarLabel.tsx";
import PersonSelectableLabel from "@/features/components/PersonSelectableLabel.tsx";

type Props = {
  error?: boolean;
  helperText?: string;
  onSelect: (person: Person) => void;
  selectedPerson: Nullable<Person>;
};
const AssigneeSearch: FC<Props> = ({
  selectedPerson,
  error,
  helperText,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const buttonRef = useRef(null);
  const popoverWidth = useElementWidth(buttonRef);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      //call search
      searchUser(searchQuery).then(setSearchedUsers);
    }, 500),
    []
  );

  const handleSelect = (user: Person) => () => {
    onSelect(user);
    setOpen(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isEmpty(e.target.value)) return;
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            ref={buttonRef}
            className="w-full justify-start"
          >
            {selectedPerson ? (
              <PersonAvatarLabel person={selectedPerson} />
            ) : (
              "Search person..."
            )}
            <Search className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" style={{ width: popoverWidth + "px" }}>
          <Input
            placeholder="Seacrh"
            onChange={handleSearchChange}
            className="mb-2"
          />
          <ScrollArea>
            <div className="max-h-60">
              {isEmpty(searchedUsers) && (
                <div className="p-2 flex justify-center">
                  <Typography variant="h6">Nothing found</Typography>
                </div>
              )}
              {searchedUsers.map((user) => {
                return (
                  <PersonSelectableLabel
                    key={user.id}
                    person={user}
                    onSelect={handleSelect(user)}
                  />
                );
              })}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {error && helperText && (
        <Typography variant="h6" className="text-destructive">
          {helperText}
        </Typography>
      )}
    </div>
  );
};

export default AssigneeSearch;
