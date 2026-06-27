import {
  List,
  Datagrid,
  TextField,
  UrlField,
  EditButton,
  DeleteButton,
  TextInput,
  TopToolbar,
  CreateButton,
  ExportButton,
  FilterButton,
} from 'react-admin';

const speakerFilters = [
  <TextInput key="search" label="Search" source="q" alwaysOn />,
];

const SpeakerListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const SpeakerList = () => (
  <List filters={speakerFilters} actions={<SpeakerListActions />} perPage={25}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Name" />
      <TextField source="bio" label="Bio" />
      <UrlField source="twitter" label="Twitter" />
      <UrlField source="linkedin" label="LinkedIn" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);