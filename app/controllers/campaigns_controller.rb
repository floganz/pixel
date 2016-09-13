class CampaignsController < ApplicationController
  respond_to :json
  def create
    @campaign = Campaign.new campaign_params
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "created",
                  :campaign => @campaign
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "create fail",
       }
    end
  end

  def update
    @campaign = Campaign.update params[:id], campaign_params
    if @campaign.save
      render :status => 200,
       :json => { :success => true,
                  :info => "updated",
                  :campaign => @campaign
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "update fail",
       }
    end
  end

  def destroy
    @campaign = Campaign.find params[:id]
    if @campaign.destroy
      render :status => 200,
       :json => { :success => true,
                  :info => "deleted",
       } 
    else
      render :status => 200,
       :json => { :success => false,
                  :info => "delete fail",
       }
    end
  end

  def index
    @campaigns = Campaign.where(user_id: params[:user_id])
      .offset(params[:offset])
      .limit(params[:limit])
    render json: @campaigns
  end

  def index_t
    p "bef"
    ids = []
    campaigns = Campaign.where(user_id: params[:user_id])
      .offset(params[:offset])
      .limit(params[:limit])
      .each { |c| ids.push c.id }
    p "aft"
    ttt = campaigns
    # c = "ttt"
    # p c
    # campaigns.each { |c| ids.push c.id }
    # if ids.size == 0 
    #   return
    # end
    targets = Target.with_count_3("'#{ids.join("','")}'").group_by {|r| r.campaign_id }
    # .tap{|g| p g}
    # targets.to_h
    # targets.each do |q|
    #   logger.debug "record = #{q}"
    # end
    # result = {}
    # campaigns.each do |c|
    #   {
    #     result[:id] => c.id,
    #     result[:name] => c.name,
    #     result[:targets] => res[c.id]
    #   }
    # end
    # p 'sdfsdf', campaigns
    z = ttt.map do |q|
      {
        :id => q.id,
        :name => q.name,
        :targets => targets[q.id].try(:[], 0..11)
      }
    end
    render json: z
    # render nothing: true 
    # render json: ttt.map do |c|
    #   {
    #     :name => "sfsfsf"
    #   }
    # end
    # result.each do |r|
    #   logger.debug "record = #{r.targets}"
    #   r.each do |t|
    #     logger.debug "data = #{t}"
    #   end
    # end
      # @campaigns
  end

  def search_t
    @campaigns = Campaign.search(params[:q], {
      offset: params[:offset],
      limit: params[:limit],
      load: false,
      where: { user_id: params[:user_id] },
      misspellings: {edit_distance: 10},
      minimum_should_match: 1
    })
    ids = []
    @campaigns.each { |c| ids.push c.id }
    render json: @campaigns.map do |c|
      {
        id: c.id,
        name: c.name,
        targets: Target.with_count(c.id, 0, 12).map do |t|
          {
            id: t.id,
            name: t.name,
            visits: t.visits,
            unique: t.unique
          } 
        end
      }
    end
    # render json: @campaigns
  end

  def search
    @campaigns = Campaign.search(params[:q], {
      offset: params[:offset],
      limit: params[:limit],
      load: false,
      where: { user_id: params[:user_id] },
      misspellings: {edit_distance: 10},
      minimum_should_match: 1
    })
    render json: @campaigns
  end

  def show
    @campaigns = Campaign.find params[:id]
    render json: @campaigns
  end

  private
    def campaign_params
      params.require(:campaign).permit(:name, :user_id)
    end
end
