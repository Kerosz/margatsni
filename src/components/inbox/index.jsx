export default function Inbox() {
  return (
    <div className="bg-white border border-gray-primary rounded md:grid lg:grid-cols-8 grid-cols-9 mb-14 flex flex-col">
      <div className="col-span-4 lg:col-span-3 flex flex-col border-r border-gray-primary">
        list
      </div>
      <div className="col-span-5 lg:col-span-5 flex items-center">chat</div>
    </div>
  );
}
