import { Avatar, Tooltip } from '@mantine/core';

import { COLOURS } from '@/assets/data/colours';
import parseNames from '@/helpers/parseNames';

export default function AvatarGroup({ names }: { names: string[] }) {
  const parsedNames = parseNames(names);

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {parsedNames.map((name, index) => (
          <Tooltip label={name} withArrow key={`${name}-${index}`}>
            <Avatar
              radius="xl"
              color={name.length > 0 ? COLOURS[Math.floor(name[0]?.charCodeAt(0) % COLOURS.length)] : 'gray'}
            >
              {name[0]}
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
