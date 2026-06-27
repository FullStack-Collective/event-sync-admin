import { Edit, SimpleForm, TextInput, required } from 'react-admin';

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Full name" validate={required()} fullWidth />
      <TextInput source="photoUrl" label="Photo URL" fullWidth />
      <TextInput source="bio" label="Bio" multiline rows={4} fullWidth />
      <TextInput source="twitter" label="Twitter URL" fullWidth />
      <TextInput source="linkedin" label="LinkedIn URL" fullWidth />
      <TextInput source="website" label="Website URL" fullWidth />
      <TextInput source="facebook" label="Facebook URL" fullWidth />
    </SimpleForm>
  </Edit>
);