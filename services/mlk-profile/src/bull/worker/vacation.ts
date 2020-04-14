import { Profile } from '../../models/Profile'
import moment from 'moment';
import sequelize, { Op } from 'sequelize';

export function jobName() {
    return process.env.VACATION_JOB;
}

export async function worker(job, done) {
    const { quantity } = job.data
    
    if (quantity) {
        const now = moment().subtract(1, 'months')
        const filter = new Date(now.year(), now.month(), 1)

        Profile.update({
            vacationDaysLeft: sequelize.literal(`coalesce("vacationDaysLeft", 0) + ${quantity}`)
        }, {
                where: {
                    creationDate: {
                        [Op.lt]: filter
                    }
                }
            });
    }

    done()
}
