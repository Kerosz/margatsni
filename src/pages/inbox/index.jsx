import Header from '../../components/header';
import Inbox from '../../components/inbox';

export default function InboxPage() {
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-3">
        <Inbox />
      </div>
    </div>
  );
}
