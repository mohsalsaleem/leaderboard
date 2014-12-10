PlayerList =  new Mongo.Collection('players');
if(Meteor.isClient)
{
    Template.leaderboard.helpers({
            'player': function()
            {
                var currentUserId = Meteor.userId();
                return PlayerList.find({createdBy:currentUserId},{sort:{Score:-1}});
            },
            'selectedClass':function(){

                var playerId = this._id;
                var selectedPlayer = Session.get('selectedPlayer');
                if(playerId == selectedPlayer)
                return 'selected';

            },
        'showSelectedPlayer':function(){

            var selectedPlayer = Session.get('selectedPlayer');
            return PlayerList.findOne(selectedPlayer);
        }


        });
    Template.leaderboard.events({

        'click .player':function(){

            var playerId = this._id;
            Session.set('selectedPlayer',playerId);

    },
        'click .increment':function(){

            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update(selectedPlayer,{$inc:{Score:5}});
        },
        'click .decrement':function(){

            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.update(selectedPlayer,{$inc:{Score:-5}});
        },

        'click .remove':function()
        {

            var selectedPlayer = Session.get('selectedPlayer');
            PlayerList.remove(selectedPlayer);
        },
        'submit form':function(event){
        event.preventDefault();
            var selectedPlayer = Session.get('selectedPlayer');
            var points = parseInt(event.target.pointsToAdd.value);
            PlayerList.update(selectedPlayer,{$inc:{Score:points}});
            //PlayerList.update()
           console.log(points);
            console.log(event.type);
        }


    });

    Template.addPlayerForm.events({

        'submit form':function(event)
        {
            event.preventDefault();
            var playerNameVar = event.target.playerName.value;
            var currentUserId = Meteor.userId();
            PlayerList.insert({
                Name:playerNameVar,
                Score:0,
                createdBy:currentUserId
            });

        }


    });
}

if(Meteor.isServer)
{
    Kadira.connect('YhWCcgXNJs7cQKe42', 'e035b33a-a5a5-4a3c-afd6-6e7599145a2f')
}
