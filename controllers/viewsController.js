exports.getOverview = (req, res) => {
  res.status(200).render('overview', {
    title: 'Jobs'
  })
}

exports.landing =  (req, res) => {
  res.status(200).render('landingPage');
}

exports.jobDetail = (req, res) => {
  res.status(200).render('job', {
    title: 'Job'
  })
}

exports.login = (req, res) => {
  res.status(200).render('login');
}

exports.signup = (req, res) => {
  res.status(200).render('signup');
}
