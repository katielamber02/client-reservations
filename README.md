"proxy": "http://localhost:9000"

  <Route exact path="/listings/:location?" component={Listings} />
        {/* <Route
          path="/dashboard"
          component={() => <Dashboard isAuthed={true} />}
        /> */}
        {/* When you use component, the router uses React.createElement to create a
        new React element from the given component. That means if you provide an
        inline function to the component attribute, you would create a new
        component every render. This results in the existing component
        unmounting and the new component mounting instead of just updating the
        existing component.” */}
        {/* <Route
          path="/dashboard"
          render={(props) => <Dashboard {...props} isAuthed={true} />}
        /> */}
-------------
export const Listings = (props: { title: string }) => {
console.log(props);
return <h2>{props.title} Listings</h2>;
};

---

interface Props {
title: string;
}

export const Listings = ({ title }: Props) => {
// console.log(props);
return <h2>{title} Listings</h2>;
};
