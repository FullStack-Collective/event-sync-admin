import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  required,
} from 'react-admin';

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Title" validate={required()} fullWidth />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={4}
        fullWidth
      />
      <ReferenceInput source="eventId" reference="events" label="Event">
        <SelectInput optionText="title" validate={required()} fullWidth />
      </ReferenceInput>
      <ReferenceInput source="roomId" reference="rooms" label="Room">
        <SelectInput optionText="name" validate={required()} fullWidth />
      </ReferenceInput>
      <DateTimeInput
        source="startTime"
        label="Start time"
        validate={required()}
      />
      <DateTimeInput
        source="endTime"
        label="End time"
        validate={required()}
      />
    </SimpleForm>
  </Create>
);