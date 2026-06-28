import { Admin, Resource } from 'react-admin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import { authProvider } from './providers/authProvider';
import { dataProvider } from './providers/dataProvider';
import { LoginPage } from './login';
import { Dashboard } from './dashboard';

import { EventList, EventEdit, EventCreate } from './resources/events';
import { RoomList, RoomEdit, RoomCreate } from './resources/rooms';
import { SessionList, SessionEdit, SessionCreate } from './resources/sessions';
import { SpeakerList, SpeakerEdit, SpeakerCreate } from './resources/speakers';
import { QuestionList } from './resources/questions';
import { CustomLayout } from './layout';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    dashboard={Dashboard}
    layout={CustomLayout}
  >
    <Resource name="events"   list={EventList}   edit={EventEdit}   create={EventCreate}   recordRepresentation="title"   icon={CalendarMonthIcon} />
    <Resource name="rooms"    list={RoomList}    edit={RoomEdit}    create={RoomCreate}    recordRepresentation="name"    icon={MeetingRoomIcon} />
    <Resource name="sessions" list={SessionList} edit={SessionEdit} create={SessionCreate} recordRepresentation="title"   icon={PodcastsIcon} />
    <Resource name="speakers" list={SpeakerList} edit={SpeakerEdit} create={SpeakerCreate} recordRepresentation="name"   icon={RecordVoiceOverIcon} />
    <Resource name="questions" list={QuestionList} recordRepresentation="content" icon={QuestionAnswerIcon} />
  </Admin>
);

export default App;