import Link from "next/link";

const PrivacyPage = () => (
  <>
    <h1>Privacy Policy</h1>

    <h2>Google Analytics</h2>
    <p>
      This website uses Google Analytics, a web analytics service provided by
      Google, Inc. ("Google"). Google Analytics uses "cookies", which are text
      files placed on your computer, to help the website analyze how users use
      the site. The information generated by the cookie about your use of this
      website is usually transmitted to a Google server in the USA and stored
      there. In the event that IP anonymization is activated on this website,
      however, your IP address will be truncated beforehand by Google within
      member states of the European Union or in other contracting states to the
      Agreement on the European Economic Area. Only in exceptional cases will
      the full IP address be transmitted to a Google server in the USA and
      shortened there. Google will use this information for the purpose of
      evaluating your use of the website, compiling reports on website activity
      for website operators and providing other services relating to website
      activity and internet usage. Google may also transfer this information to
      third parties where required to do so by law, or where such third parties
      process the information on Google's behalf. The IP address transmitted by
      your browser as part of Google Analytics will not be merged with other
      data from Google.
    </p>
    <p>
      By using this website you consent to the processing of data about you by
      Google in the manner and for the purposes set out above.
    </p>

    <p>
      Back to
      <Link href="/">
        <a> Home</a>
      </Link>
    </p>
  </>
);

export default PrivacyPage;
