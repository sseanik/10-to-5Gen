import { DataType } from '@/types/Data';

export default function Dashboard({ data }: { data: DataType }) {
  return <div>Dashboard {JSON.stringify(data, null, 2)}</div>;
}
