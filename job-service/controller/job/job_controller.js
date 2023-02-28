import createError from 'http-errors'
import mongoose from 'mongoose'
import { Job } from '../../model/job/job_model.js'
import JobSchema from '../../model/job/job_joi_model.js'

// PostJob is for creating new jobs
export const PostJob = async (req, res, next) => {
    try {
        const sanitaizedData = await JobSchema.validateAsync(req.body)
        if (!sanitaizedData) {
            throw createError(422, 'Invalid data')
        }
        const job = new Job(sanitaizedData)
        const savedJob = await job.save()
        res.status(200).send(savedJob)
    } catch (error) {
        if (error.isJoi === true) {
            error.status = 422
        }
        next(error)
    }
}
// GetAllJob is for getting all jobs
export const GetAllJob = async (req, res, next) => {
    try {
        const job = await Job.find()
        if (!job) {
            throw createError(404, 'Job not found')
        }
        res.status(200).send(job)
    } catch (error) {
        next(error)
    }
}
// GetJob is for getting a specific job by id
export const GetJob = async (req, res, next) => {
    try {
        const _jobId = req.params.job_id
        const job = await Job.findById(_jobId)
        if (!job) {
            throw createError(404, 'Job not found')
        }
        res.send(job)
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid job id'))
            return
        }
        next(error)
    }
}
// UpdateJob is for updating a specific job by id
export const UpdateJob = async (req, res, next) => {
    try {
        const _jobId = req.params.job_id
        const sanitaizedData = await JobSchema.validateAsync(req.body)
        if (!sanitaizedData) {
            throw createError(422, 'Invalid data')
        }
        const updatedJob = await Job.findByIdAndUpdate(_jobId, sanitaizedData, { new: true })
        res.status(200).send(updatedJob)
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid job id'))
            return
        }
        if (error.isJoi === true) {
            error.status = 422
        }
        next(error)
    }
}
// DeleteJob is for deleting a specific job by id
export const DeleteJob = async (req, res, next) => {
    try {
        const _jobId = req.params.job_id
        const DeletedJob = await Job.findByIdAndDelete(_jobId)
        if (!DeletedJob) {
            throw createError(404, 'Job not found')
        }
        res.status(200).send(DeletedJob)
    } catch (error) {
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid job id'))
            return
        }
        next(error)
    }
}