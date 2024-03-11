import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        flex: 1,
      },
      thumbnail: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginTop: 10
      },
      descriptionContainer: {
         display: 'flex',
         flexDirection: 'column',
         margin: 5,
         width: '70%'
      },
      title: {
        fontWeight: 'bold',
      },
      description: {
        fontSize: 12,
        color: '#666',
        
      }
});