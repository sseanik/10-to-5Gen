import { Avatar, Tooltip } from '@mantine/core';

import { COLOURS } from '@/assets/data/colours';

interface AvatarGroupProps {
  names: string[];
  plusNumber: number;
}

export default function AvatarGroup({ names, plusNumber }: AvatarGroupProps) {
  const avatarNames = names.slice(0, names.length - plusNumber);
  const plusNames = names.slice(-1 * plusNumber);

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {avatarNames.map((name) => (
          <Tooltip label={name} withArrow key={name}>
            <Avatar radius="xl" color={COLOURS[Math.floor(name[0].charCodeAt(0) % COLOURS.length)]}>
              {name[0]}
            </Avatar>
          </Tooltip>
        ))}
        <Tooltip
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
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
}
