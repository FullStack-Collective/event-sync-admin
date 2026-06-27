import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
} from 'react-admin';

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Title" validate={required()} fullWidth />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={4}
        fullWidth
      />
      <TextInput source="location" label="Location" fullWidth />
      <TextInput source="bannerUrl" label="Banner URL" fullWidth />
      <DateTimeInput
        source="startDate"
        label="Start date"
        validate={required()}
      />
      <DateTimeInput
        source="endDate"
        label="End date"
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);