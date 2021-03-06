import {
	CloudFormationClient,
	DescribeStacksCommand,
} from '@aws-sdk/client-cloudformation'
import { toObject } from './toObject'

/**
 * Returns the outputs of a CloudFormation stack as an object
 */
export const stackOutput = (cf: CloudFormationClient) => async <
	T extends { [key: string]: string }
>(
	StackName: string,
): Promise<T> => {
	const { Stacks } = await cf.send(new DescribeStacksCommand({ StackName }))
	if (!Stacks || !Stacks.length || !Stacks[0].Outputs) {
		throw new Error(`Stack ${StackName} not found.`)
	}
	return toObject(Stacks[0].Outputs) as T
}
