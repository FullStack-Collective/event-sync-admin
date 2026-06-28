import { Layout} from 'react-admin';
import type { LayoutProps } from 'react-admin';
import { CustomMenu } from './CustomMenu';

export const CustomLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    menu={CustomMenu}
    appBar={() => null}
    sx={{
      '& .RaLayout-appFrame': {
        marginTop: '0 !important',
      },
      '& .RaLayout-contentWithSidebar': {
        marginTop: '0 !important',
      },
      '& .RaSidebar-root': {
        display: 'none',
      },
      '& .RaLayout-content': {
        marginLeft: '240px',
        minHeight: '100vh',
        backgroundColor: '#0d1b1a',
        padding: '0',
        transition: 'margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }}
  />
);