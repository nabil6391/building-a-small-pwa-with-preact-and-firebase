import { h, Component } from 'preact';
import { auth, database } from '../firebase';
import CurrentUser from '../CurrentUser';
import ExerciseList from './ExerciseList';
import SignIn from '../SignIn';

export default class Exercises extends Component {
	constructor() {
		super();

		this.state = {
			currentUser: null,
			exercises: null
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(currentUser => {
			this.setState({ currentUser });
		});

		const exercisesRef = database.ref('/' + 'user01' + '/exercises');

		exercisesRef.on('value', snapshot => {
			this.setState({ exercises: snapshot.val() });
		});
	}

	render() {
		const { currentUser, exercises } = this.state;

		return (
			<section>
				{!currentUser && <SignIn />}
				{currentUser &&
										<section>
											<ExerciseList exercises={exercises} user={currentUser} />
											<CurrentUser user={currentUser} />
										</section>}
			</section>
		);
	}
}
