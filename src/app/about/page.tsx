export default function About() {
  return (
    <div className="py-10 space-y-6">
      <h1 className="text-3xl font-semibold">About DreamWorks Resin</h1>
      <p>
        DreamWorks Resin was created as an extension of Dreamworks Dental Laboratories, a trusted lab serving doctors for over 20 years. 
        After decades of producing high-quality restorations, we decided to make the same materials we use daily available to other labs and doctors.
      </p>
      <h2 className="text-2xl font-semibold">Our Mission</h2>
      <p>
        To provide reliable, lab-tested dental products professionals can trust — tested in real clinical workflows to guarantee quality.
      </p>
      <ul className="list-disc pl-6 text-slate-700">
        <li><b>Quality</b> – Tested in a real laboratory environment.</li>
        <li><b>Reliability</b> – Consistent results, case after case.</li>
        <li><b>Service</b> – Supporting labs and doctors with care and expertise.</li>
      </ul>
    </div>
  );
}