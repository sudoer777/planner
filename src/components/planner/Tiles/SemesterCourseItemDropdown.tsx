import { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ClipboardListIcon from '@/icons/ClipboardListIcon';
import ColorSwatchIcon from '@/icons/ColorSwatchIcon';
import ChevronIcon from '@/icons/ChevronIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import { tagColors } from '../utils';
import { ObjectID } from 'bson';

const itemClasses =
  'flex items-center gap-x-3 border-b border-neutral-300 px-2 py-2 hover:bg-neutral-200 cursor-pointer text-sm';

const contentClasses = 'w-64 rounded-md border border-neutral-300 bg-generic-white';

export interface SemesterTileDropdownProps {
  deleteCourse: () => void;
  changeColor: (color: keyof typeof tagColors) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SemesterCourseItemDropdown: FC<SemesterTileDropdownProps> = ({
  deleteCourse,
  changeColor,
  open,
  onOpenChange,
  children,
}) => {
  const id = new ObjectID().toString();
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger data-no-dnd="true" asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          data-no-dnd="true"
          className={contentClasses + ' animate-[slideUpAndFade_0.3s]'}
          sideOffset={10}
          align="start"
        >
          <DropdownMenu.Item className={itemClasses} onClick={deleteCourse}>
            <DeleteIcon />
            <span>Delete</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClasses}>
            <ClipboardListIcon />
            <span>Lock course</span>
          </DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={itemClasses + ' justify-between border-none'}>
              <div className="flex items-center gap-x-3">
                <ColorSwatchIcon />
                <span>Change color</span>
              </div>
              <ChevronIcon className="h-3 w-3" />
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                data-no-dnd="true"
                className={contentClasses + ' animate-[slideLeftAndFade_0.3s]'}
                sideOffset={-10}
                alignOffset={0}
              >
                {Object.entries(tagColors).map(([color, classes]) => (
                  <DropdownMenu.Item
                    className={itemClasses}
                    key={`${id}-tag-${color}`}
                    onClick={() => changeColor(color as keyof typeof tagColors)}
                  >
                    <div className={`h-5 w-5 rounded-sm border ${classes}`}></div>
                    <span>
                      {color.substring(0, 1).toUpperCase() + color.substring(1) || 'None'}
                    </span>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SemesterCourseItemDropdown;
