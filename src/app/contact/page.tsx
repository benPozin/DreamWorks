export default function Contact() {
  return (
    <div className="py-10 space-y-4">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <form className="grid gap-3 max-w-xl" action="mailto:beyondutilitiescanada@gmail.com" method="post" encType="text/plain">
        <input required name="name" placeholder="Name" className="border rounded-lg px-3 py-2" />
        <input required name="email" type="email" placeholder="Email" className="border rounded-lg px-3 py-2" />
        <input name="phone" placeholder="Phone" className="border rounded-lg px-3 py-2" />
        <textarea required name="message" placeholder="Message" className="border rounded-lg px-3 py-2 h-32"/>
        <button className="rounded-lg px-5 py-3 bg-brand-500 text-white hover:bg-brand-600">Send</button>
      </form>
    </div>
  );
}