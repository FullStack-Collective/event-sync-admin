import {
  List, Datagrid, TextField, NumberField,
  EditButton, DeleteButton, TextInput,
  FilterButton, TopToolbar, CreateButton, ExportButton,
} from 'react-admin';
import { PageHeader } from '../../components/PageHeader';

const Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const roomFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
];

const RoomListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const RoomList = () => (
  <>
    <PageHeader
      icon={<Icon />}
      title="Rooms"
      subtitle="Manage venues and room capacity"
    />
    <List filters={roomFilters} actions={<RoomListActions />} perPage={25}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="id" label="ID" />
        <TextField source="name" label="Name" />
        <NumberField source="capacity" label="Capacity" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  </>
);
