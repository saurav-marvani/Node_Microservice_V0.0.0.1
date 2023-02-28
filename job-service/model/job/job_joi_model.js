import Joi from 'joi'

const JobSchema = Joi.object({
    title: Joi.string(),
    company: Joi.string().required(),
    description: Joi.string().min(10).lowercase(),
    location: Joi.string(),
    workType: Joi.string(),
    workLevel: Joi.string(),
    salary: Joi.number(),
    logoUrl: Joi.string(),
})

export default JobSchema