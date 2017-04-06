//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Heading1, Paragraph, Tip } from '../../common/Text';
import system from '../../common/System'

// create a component
class StoryCell extends Component {
    render() {

        // NSDictionary *vote = [NSDictionary dictionaryWithDictionary:[dictionary objectForKey:@"votes"]];
        // self.hateCount = [[vote objectForKey:@"down"] integerValue];
        // self.likeCount = [[vote objectForKey:@"up"] integerValue];

        // id user = [dictionary objectForKey:@"user"];

        let info = this.props.info;

        let image = null;
        if (info.image) {
            let prefixId = info.id.toString().substr(0, 5);
            let imageUrl = `http://pic.qiushibaike.com/system/pictures/${prefixId}/${info.id}/medium/${info.image}`
            image = <Image
                style={styles.image}
                source={{ uri: imageUrl }}
                resizeMode='contain'
            />
        }

        let user = info.user;
        if (user == null) {
            user = {}
        }
        let avatar = (user.id == null) ?
            '' :
            `http://pic.qiushibaike.com/system/avtnew/${user.id.toString().substr(0, 4)}/${user.id}/medium/${user.icon}`

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={styles.top}>
                    <Image
                        style={styles.icon}
                        source={{ uri: avatar }}
                    />
                    <View>
                        <Paragraph>{user.login}</Paragraph>
                        <Tip>{info.published_at}</Tip>
                    </View>
                </View>

                <Paragraph>{info.content}</Paragraph>
                {image}
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    image: {
        width: system.screenWidth - 20,
        height: 200,
    }
});

//make this component available to the app
export default StoryCell;
