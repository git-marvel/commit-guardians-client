const TEAM_MAIL = "commitguardians@google.com";

function Footer() {
  return (
    <div className="absolute bottom-5 flex w-full justify-evenly">
      <a
        href="https://github.com/git-marvel"
        target="_blank"
        className="text-sm text-slate-500"
      >
        <h2 className="m-1 text-center text-sm">
          We are commit guardians!
          <p className="text-yellow-500">Team @git-marvel</p>
        </h2>
      </a>
      <h2 className="m-1 text-center text-sm text-slate-500">
        If you have an idea for a commit guardians,
        <a href={`mailto:${TEAM_MAIL}`} className="block">
          Please email to <b className="text-sky-400">{TEAM_MAIL}</b>
        </a>
      </h2>
    </div>
  );
}

export default Footer;
