<template lang="pug">
    div
        .item
            img(:src="repo.owner.avatar_url")
            h3
                a(:href="repo.owner.url")
                    | {{ repo.owner.login }} / {{ repo.name }}
            p
                | {{ repo.description }}
</template>

<script>
export default {
    name: 'RepoItem',
    props: ['repo']
}
</script>

