import React from 'react'
import styles from "./CSSParallax.module.css";

function CSSParallax() {
  return (
    <div className={styles.wrapper}>
        <header className={styles.header}>
            <img src={require("./parallaxImgs/splash.png")} className={styles.background}></img>
            <img src={require("./parallaxImgs/lense.png")} className={styles.foreground}></img>
            <h1 className={styles.title}>Welcome!</h1>
        </header>
        <section className={styles.section}>
        At its apogee in the 1930s Ford’s River Rouge complex, just outside Detroit, employed some 100,000 people and pro­duced a car every 49 seconds. Diego Rivera, a Mexican artist, painted a series of murals depicting the heroic workers and futuristic machines, working in harmony to usher in a new era of prosperity.
        Almost a century later River Rouge is getting a new lease on life. Construction workers are busily expanding the assembly lines that produce the F­150 Lightning, the electric version of America’s bestselling pickup. There is less clanging than when Rivera visited, and more whirring. Me­ chanical claws eﬀortlessly whisk vehicle frames from place to place. Self­driving carts glide around the factory ﬂoor. Ford is hoping for a surge in sales thanks to lavish
        new tax credits for people who buy American-made electric vehicles. But it is not just the factory that is enjoying a renais­sance: so is the dream that River Rouge once embodied, of an America made prosperous by multitudes of jobs in cut­ ting­edge manufacturing.
        Over the past two years, urged on by President Joe Biden, Democrats in Congress have enacted a series of laws to revive manufacturing in America, as part of a $2trn overhaul of the economy. The CHIPS Act, passed in July, includes $39bn to spur domestic production of semiconductors, along with even bigger investments in re­ search and development. The Inﬂation Re­ duction Act (IRA), approved in August, boosts clean energy in many ways, includ­ ing tax credits for manufacturing. The Congressional Budget Oﬃce estimates these will cost $37bn over a decade, al­ though it could be much more, since the ira does not limit the total value of credits that can be claimed. There are indirect
        subsidies for manufacturers, too, in the form of tax credits for consumers who purchase American­made goods. Then there are a multitude of factory­friendly regulations, such as “Buy American” rules for govern­ ment procurement. In 2021 Congress also approved $1.2trn in spending on infra­ structure, intended in part to make Ameri­ can manufacturing more competitive.
        The subsidies apply mainly to two industries: clean energy and semiconductors. The intention is not just to spur manufacturing, but also to curb climate change, limit dependence on China and pep up parts of America that have fallen be­ hind. This ambitious agenda helps explain why the laws feature so many complicated and overlapping incentives.
        Some take the form of tax credits tied to production volumes: $3 for every kilogram of green hydrogen, for example, or $35 for every kilowatt­hour of battery capacity. So­ lar panels, wind turbines and even certain minerals used in clean technology beneﬁt from similar credits. There are tax credits for investments, as well, in manufacturing facilities producing gear used in all man­ ner of clean­energy projects, from geother­ mal power to carbon capture and storage.
        </section>
    </div>
  )
}

export default CSSParallax