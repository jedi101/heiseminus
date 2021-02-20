function main(config) {
    const imageTagInstance = new Tag(config.tag)
    const heiseMinusInstance = new HeiseMinus(config, imageTagInstance.tag)
}

main(config)