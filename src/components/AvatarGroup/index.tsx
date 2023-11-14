import { Avatar, Tooltip } from '@mantine/core';

import { COLOURS } from '@/assets/data/colours';
import parseNames from '@/helpers/parseNames';

export default function AvatarGroup({ names }: { names: string[] }) {
  const parsedNames = parseNames(names);

  if (names.length === 0) return null;

  const getInitials = (name: string) => {
    // Remove any parentheses and their contents
    const cleanedName = name.replace(/\(.*?\)/, '').trim();
    // Check if the name contains a comma
    const containsComma = cleanedName.includes(',');
    // Split the name into parts
    let parts = cleanedName.split(' ');
    // If the name contains a comma, reverse the parts
    if (containsComma) {
      parts = parts.reverse();
    }
    // Get the first letter of each part
    const initials = parts.map((part) => part[0].toUpperCase()).join('');
    return initials;
  };

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {parsedNames.map((name, index) => (
          <Tooltip label={name} withArrow key={`${name}-${index}`}>
            <Avatar
              radius="xl"
              color={name.length > 0 ? COLOURS[Math.floor(name[0].charCodeAt(0) % COLOURS.length)] : 'gray'}
            >
              {getInitials(name)}
            </Avatar>
          </Tooltip>
        ))}
        {/* <Tooltip
          withArrow
          label={
            <>
              {plusNames.map((tooltipName) => (
                <div key={tooltipName}>{tooltipName}</div>
              ))}
            </>
          }
        >
          <Avatar radius="xl">+{plusNumber}</Avatar>
        </Tooltip> */}
      </Avatar.Group>
    </Tooltip.Group>
  );
}
