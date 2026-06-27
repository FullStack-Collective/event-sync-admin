import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  TextInput,
  TopToolbar,
  CreateButton,
  ExportButton,
  FilterButton,
} from 'react-admin';

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
  <List filters={roomFilters} actions={<RoomListActions />} perPage={25}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <NumberField source="capacity" label="Capacity" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);