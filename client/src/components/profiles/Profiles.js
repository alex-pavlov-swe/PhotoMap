import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({
	lang: { lang },
	getAllProfiles,
	profile: { profiles, loading },
}) => {
	useEffect(() => {
		getAllProfiles();
		setFilterProfession('all');
	}, [getAllProfiles]);

	const [filterProfession, setFilterProfession] = useState({
		filterProfession: 'all',
	});

	const onChange = (e) => {
		setFilterProfession(e.target.value);
	};

	return (
		<div>
			{profiles === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<div className="md-10 offset-1 mt-4 mb-4 full-page">
						<h1>
							{lang === 'rus'
								? 'Список всех профилей'
								: 'The list of all profiles'}
						</h1>
						<div className="card m-4 bg-info">
							<div className="card-header">
								<div className="card-body">
									<form>
										<select
											name="profession"
											value={filterProfession}
											onChange={(e) => onChange(e)}
										>
											<option value="all">
												{lang === 'rus'
													? 'Фильтр - выберите кого вы ищете'
													: 'Filter - select whom are you looking for'}
											</option>
											<option value="Guide">
												{lang === 'rus' ? 'Гид' : 'Guide'}
											</option>
											<option value="Cook">
												{lang === 'rus' ? 'Повар' : 'Cook'}
											</option>
											<option value="Translator">
												{lang === 'rus' ? 'Переводчик' : 'Translator'}
											</option>
											<option value="Driver">
												{lang === 'rus' ? 'Водитель' : 'Driver'}
											</option>
											<option value="Volunteer">
												{lang === 'rus' ? 'Волонтер' : 'Volunteer'}
											</option>
										</select>
									</form>
								</div>
							</div>
						</div>
						{profiles.length > 0 ? (
							filterProfession !== 'all' ? (
								profiles
									.filter((profile) => profile.profession === filterProfession)
									.map((profile) => (
										<ProfileItem
											key={profile._id}
											profile={profile}
											lang={lang}
										/>
									))
							) : (
								profiles.map((profile) => (
									<ProfileItem
										key={profile._id}
										profile={profile}
										lang={lang}
									/>
								))
							)
						) : (
							<h4>No profiles found</h4>
						)}
					</div>
				</Fragment>
			)}
		</div>
	);
};

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	lang: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	lang: state.lang,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
