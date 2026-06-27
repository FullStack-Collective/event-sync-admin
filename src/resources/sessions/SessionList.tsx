import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  EditButton,
  DeleteButton,
  TextInput,
  TopToolbar,
  CreateButton,
  ExportButton,
  FilterButton,
} from 'react-admin';

const sessionFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
];

const SessionListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const SessionList = () => (
  <List filters={sessionFilters} actions={<SessionListActions />} perPage={10}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Title" />
      <ReferenceField source="eventId" reference="events" label="Event">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="roomId" reference="rooms" label="Room">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="startTime" label="Start" showTime />
      <DateField source="endTime" label="End" showTime />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);