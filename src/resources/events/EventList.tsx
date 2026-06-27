import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  TextInput,
  SelectInput,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton,
} from 'react-admin';

const eventFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
  <SelectInput
    key="status"
    label="Status"
    source="status"
    choices={[
      { id: 'upcoming', name: 'Upcoming' },
      { id: 'past', name: 'Past' },
    ]}
  />,
];

const EventListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const EventList = () => (
  <List filters={eventFilters} actions={<EventListActions />} perPage={10}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="title" label="Title" />
      <TextField source="location" label="Location" />
      <DateField source="startDate" label="Start date" showTime />
      <DateField source="endDate" label="End date" showTime />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);