const React = require('react')
const Def = require('./default')

function home () {
    return (
        <Def>
            <main>
                <h1>Restaurant: Rave or Rant</h1>
                <p>Whether you love them or hate them, you still ought to list them!</p>
                <p>Let this be your soapbox from which your Kentuky Fried Words ring.</p>
                <div>
                    <img src="/images/chia-fruit-drink.jpg" alt="Chia Fruit Shake" />
                    <p>
                        Photo by <a href="https://unsplash.com/@cravethebenefits?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Brenda Godinez</a> on <a href="https://unsplash.com/s/photos/free-food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                    </p>
                </div>
                <a href="/places">
                    <button className="btn-primary">Places Page</button>
                </a>
            </main>
        </Def>
    )
}

module.exports = home