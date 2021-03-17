import Head from 'next/head'
import Link from 'next/link'

export default function About({ grants }) {
  return (
    <div>
      <Head>
        <title>LBRY Community Funding Experiment</title>
      </Head>

      <main className="container max-w-2xl mx-auto">
        <h1 className="mb-4">About</h1>

        <p>This is the about page. It will eventually tell you what all this is about.</p>

        <p>
        [Gitcoin Grants](https://gitcoin.co/grants/) has been doing [quadratic funding](https://wtfisqf.com) for Ethereum for several years. It's an innovative, economically sound, and democratic way of funding community projects. The LBRY community would benefit from a similar setup.
        </p>

        <h2>How It Works</h2>

        <p>
        A funding round happens every few months. It lasts one week. At the start of the round, an amount of LBC (let's say 100K for the first round) is set aside by the Foundation. These tokens will be used to match community donations to projects that apply for funding during the round.
        </p>

        <p>
        Once the round starts, any project can apply for funding by publishing a claim (a post or video) to LBRY that describes the project. All applications are public. Once a project applies, anyone with LBC can contribute to the project by supporting it's application claim with LBC. Supports must be from a channel (aka not anonymous), or it won't count. People are free to contribute to multiple projects, or even to the same project multiple times. Or if they don't want to pick specific projects, they can contribute to the matching pool directly by sending LBC to it.
        </p>

        <p>
        After the round ends, the matching pool is split among all the projects that received contributions. The amount each project gets is based on a Quadratic Funding formula, which depends on how many different people contributed as well as the amount of the contributions. The former has a bigger effect than the latter. Want your project to get as much funding as possible? Get contributions from many different people.
        </p>

        <h2>Benefits</h2>

        - Transparency. All applications and funding decisions happen in the open
        - Democracy. It gives control of funding decisions to the community itself. The foundation doesn't have to make decisions about which projects are worthy of how much funding.
        - Predicability. There's a regular schedule, so projects that rely on continued funding can reapply every round.
        - Flexibility. It works equally well for small and large projects.
        - Charity. Funding comes both from the community and from the foundation.
        - Visibility. Natural promotion of LBRY and the opporunity for new members to join the community.


        ## Unique Identity

        One way to abuse this system is to make lots of channels and contribute a small amount from each channel. Judging from Gitcoin's experience running this system over the last few years, this concern is real but not a dealbreaker. We can adopt [several techniques](https://gitcoin.co/wiki/grants/#wiki-toc-i-see-a-bug-or-ive-got-a-question-what-do-i-do) from them to mitigrate Sybil attacks, and add some of our own. Possible ideas:

        - Start small and scale slowly. We'll learn a lot about this challenge as we go.
        - Require that donor channels are at least a certain level to qualify for matching. https://lbry.tv/@lbry:3f/levelsonodysee:c
        - Link donor channels to external forms of identity (e.g. social media accounts) to build trust.
        - Use Vitalik Buterin's [pairwise bonding formula](https://ethresear.ch/t/pairwise-coordination-subsidies-a-new-quadratic-funding-design/5553) to dampen the effect.


        ## Roadmap & Details

        Here's a sample roadmap of what the next steps would be if this proposal is accepted.

        - [ ] Foundation commits to running at least one round of funding, and picks how much to contribute to the round (e.g. 100K LBC)
        - [ ] Pick dates and a tag for this round (e.g. Mar 29 - Apr 2, tag `funding-round-1`)
        - [ ] Decide what criteria a channel must meet to count as a contributor (see Unique Identity above).
        - [ ] Replace https://lbry.fund with a simple page that shows applications for funding and explains the funding process (how it works, how to apply, how to contribute, when matching happens, etc). See https://wtfisqf.com for an example of an explainer page.
        - [ ] Publicize the whole thing.
        - [ ] Write code to do matching and show current match for each application. Use [this](https://github.com/anish-agnihotri/quadratic-funding) as a starting point.


        ## Demo of the Algorithm

        The Foundation sets aside 100 LBC. There are two projects. Project A has one person contribute 4LBC. Project B has four different people contribute 1LBC each. When it comes time to match, A will get 20LBC and B will get 80LBC. The pseudocode math:

        ```
        fund = 100
        a_contribs = [4]
        b_contribs = [1,1,1,1]
        a_scaled = sum([sqrt(4)]) ^ 2 = 4
        b_scaled = sum([sqrt(1), sqrt(1), sqrt(1), sqrt(1)]) ^ 2 = 16
        total_scaled = sum([a_scaled, b_scaled]) = 20
        a_match = fund * (a_scaled / total_scaled) = 100 * ( 4/20) = 20
        b_match = fund * (b_scaled / total_scaled) = 100 * (16/20) = 80
        ```

        [Here's an interactive demo](https://wtfisqf.com/?grant=4&grant=1,1,1,1&match=100) of this scenario (scroll down to Grants).


        ## Links

        - [Quad Funding paper](https://blogchains.org/wp-content/uploads/sites/4/2019/04/SSRN-id3243656.pdf)
        - https://wtfisqf.com
        - https://gitcoin.co/wiki/grants/
        - https://clr.fund
        - [Pairwise coordination subsidies](https://ethresear.ch/t/pairwise-coordination-subsidies-a-new-quadratic-funding-design/5553)
        - https://github.com/anish-agnihotri/quadratic-funding

      </main>
    </div>
  )
}
