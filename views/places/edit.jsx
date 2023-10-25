const React = require('react')
const Def = require('../default.jsx')

function edit_form (data) {
    return (
        <Def>
            <main>
                <h1>Edit Place</h1>
                <form method="POST" action={`/places/${data.id}?_method=PUT`}>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="name">Place Name</label>
                            <input className="form-control" id="name" name="name" defaultValue={data.place.name} required />
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="pic">Place Picture</label>
                            <input className="form-control" id="pic" name="pic" defaultValue={data.place.pic} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="city">City</label>
                            <input className="form-control" id="city" name="city" defaultValue={data.place.city} />
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="state">State</label>
                            <input className="form-control" id="state" name="state" defaultValue={data.place.state} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cuisines">Cuisines</label>
                        <input className="form-control" id="cuisines" name="cuisines" defaultValue={data.place.cuisines} required />
                    </div>
                    <input className="btn btn-primary" type="submit" value="Update Place" />
                </form>
            </main>
        </Def>
    )
}

module.exports = edit_form