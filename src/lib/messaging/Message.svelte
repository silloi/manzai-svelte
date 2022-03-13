<script lang="ts">
	import { MESSAGE_TYPE } from '$lib/enums/common';

	export let type = 0;
	export let name = '';
	export let message = '';
	export let avatar = '';

	export let avatarSize = 60;
	export let avatarRadius = avatarSize / 2;

	export let messageSize = 16;
	export let messageColor = 'black';

	export let nameSize = 16;
	export let nameColor = 'black';

	export let bubbleRadius = 16;
	export let bubbleColor = 'lightgray';

	const tellName = (type: MESSAGE_TYPE) => {
		switch (type) {
			case MESSAGE_TYPE.DESCRIPTIVE:
				return 'description';
			case MESSAGE_TYPE.SUBJECTIVE:
				return 'subject';
			case MESSAGE_TYPE.OBJECTIVE:
				return 'object';
			default:
		}
	};
	$: typeName = tellName(type);
</script>

<div class="wrapper">
	<div class={typeName}>
		<div class="action">
			<div class="action-outer" style="width: {avatarSize}px">
				<div class="avatar" style="width: {avatarSize}px; height: {avatarSize}px">
					{#if avatar}
						<img src={avatar} style="border-radius: {avatarRadius}px" alt="" />
					{/if}
				</div>
			</div>
			<div class="action-inner">
				{#if name}
					<span class="name" style="font-size: {nameSize}; color: {nameColor}">{name}</span>
				{/if}
				<div>
					<p
						class="message bubble"
						style="font-size: {messageSize}px; color: {messageColor}; background-color: {bubbleColor}; border-radius: {bubbleRadius}px"
					>
						{message}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}

	.subject {
		align-self: flex-end;
		text-align: right;
	}

	.action {
		display: flex;
	}

	.subject .action {
		flex-direction: row-reverse;
	}

	.subject > .action {
		justify-content: flex-end;
	}

	p {
		word-break: break-word;
		white-space: pre-wrap;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.name {
		font-size: 1rem;
		padding: 0 0.5rem;
	}

	.message {
		width: fit-content;
		margin: 0.2rem 0.5rem;
		padding: 0.5rem 0;
		text-align: left;
	}

	.bubble {
		padding: 0.5rem 1rem;
	}

	.description {
		text-align: center;
	}
</style>
